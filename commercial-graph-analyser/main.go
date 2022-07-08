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

func loadCommercialFiles(frontendJsPath string, frontendGraphPath string) ([]string, error) {
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

	var commercialFiles = make([]string, len(graph))

	for file := range graph {
		commercialFiles = append(commercialFiles, makeRelativePath(frontendJsPath, file))
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

func diffFiles(all []string, commercial []string) {
	// Build a set of all the commercial files
	// This is so we can do existence checks below
	commercialSet := make(map[string]bool, len(commercial))
	for _, c := range commercial {
		commercialSet[c] = true
	}

	for _, a := range all {
		isCommercial := commercialSet[a]
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
