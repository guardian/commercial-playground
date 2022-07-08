package main

const (
	Reset  = "\033[0m"
	Red    = "\033[31m"
	Yellow = "\033[33m"
	Green  = "\033[32m"
	Gray   = "\033[37m"
)

func red(s string) string {
	return Red + s + Reset
}

func yellow(s string) string {
	return Yellow + s + Reset
}

func green(s string) string {
	return Green + s + Reset
}

func gray(s string) string {
	return Gray + s + Reset
}
