package main

import (
	"encoding/json"
	"fmt"
	"io/fs"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
)

func makeRelativePath(frontendJsPath string, path string) string {
	if strings.HasPrefix(path, "../") {
		return strings.Replace(path, "../", frontendJsPath+"/", 1)
	}
	return frontendJsPath + "/bootstraps/" + path
}

func loadCommercialFiles(frontendJsPath string, frontendGraphPath string) (map[string]bool, error) {
	jsonFile, err := os.Open(frontendGraphPath)

	if err != nil {
		return nil, err
	}

	// Dunno what this does...
	defer jsonFile.Close()

	bytes, err := ioutil.ReadAll(jsonFile)

	if err != nil {
		return nil, err
	}

	var graph map[string][]string

	if err := json.Unmarshal([]byte(bytes), &graph); err != nil {
		return nil, err
	}

	var commercialFiles = make(map[string]bool)

	for path, imports := range graph {
		commercialFiles[makeRelativePath(frontendJsPath, path)] = true

		for _, importPath := range imports {
			commercialFiles[makeRelativePath(frontendJsPath, importPath)] = true
		}
	}

	return commercialFiles, nil
}

func loadFrontendJS(root string) ([]string, error) {
	var files []string

	err := filepath.WalkDir(root, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		if !d.IsDir() {
			files = append(files, path)
		}

		return nil
	})

	fmt.Printf("Obtained total %d files\n", len(files))

	return files, err
}

// Remove `.spec.` from the pathname
func isCommercialSpec(commercial map[string]bool, path string) bool {
	checkForSameExt := strings.Replace(path, ".spec.", ".", 1)
	checkForTs := strings.Replace(path, ".spec.js", ".ts", 1)
	checkForJs := strings.Replace(path, ".spec.ts", ".js", 1)
	return commercial[checkForSameExt] || commercial[checkForTs] || commercial[checkForJs]
}

func isDeclaration(path string) bool {
	return strings.HasSuffix(path, ".d.ts")
}

func isTs(path string) bool {
	return strings.HasSuffix(path, "ts")
}

func diffFiles(all []string, commercial map[string]bool) {
	totalFiles := len(all)
	totalTsCount := 0
	tsDeclaraionCount := 0
	commercialCount := 0
	commercialTsCount := 0

	for _, path := range all {
		if isTs(path) {
			totalTsCount += 1
		}

		isCommercial := commercial[path]
		// Mark all declaration files, as we can't be sure whether we'll need them or not
		// At least from the import graph (since they aren't explicitly imported)
		if isDeclaration(path) {
			fmt.Println(yellow(path))
			tsDeclaraionCount += 1
		} else if isCommercial || isCommercialSpec(commercial, path) {
			fmt.Println(green(path))
			commercialCount += 1
			if isTs(path) {
				commercialTsCount += 1
			}
		} else {
			fmt.Println(red(path))
		}
	}

	fmt.Printf("\nDiff complete!\n")
	fmt.Printf("Total files found: %d files (%d .ts files, %d .js files)\n", totalFiles, totalTsCount, totalFiles-totalTsCount)
	fmt.Printf("Commercial files: %d files (%d .ts files, %d .js files)\n", commercialCount, commercialTsCount, commercialCount-commercialTsCount)
	fmt.Printf("TS Declaration files: %d files\n", tsDeclaraionCount)
	fmt.Printf("Can safely delete: %d files\n", totalFiles-commercialCount-tsDeclaraionCount)
}

func main() {
	// Assume typical path to commercial graph in Frontend
	frontendGraphPath := "../../../code/frontend/tools/__tasks__/commercial/graph/output/standalone.commercial.ts.json"

	// Assume typical path to JS/TS in Frontend
	frontendJsPath := "../../../code/frontend/static/src/javascripts"

	allFiles, err1 := loadFrontendJS(frontendJsPath)

	if err1 != nil {
		fmt.Println(err1)
	}

	// Load in the full set of commercial files
	commercialFiles, err2 := loadCommercialFiles(frontendJsPath, frontendGraphPath)

	if err2 != nil {
		fmt.Println(err2)
	}

	diffFiles(allFiles, commercialFiles)
}
