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

	for path := range graph {
		commercialFiles[makeRelativePath(frontendJsPath, path)] = true
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

func diffFiles(all []string, commercial map[string]bool) {
	for _, a := range all {
		isCommercial := commercial[a]
		if isCommercial {
			fmt.Println(green(a))
		} else {
			fmt.Println(red(a))
		}
	}
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
