#! /usr/bin/env node
const commander = require('./commands')
const printer = require('./printer')

// Setup commands and handler
const program = commander.setupCommander()

// Show help text if option is unspecified
if (!process.argv.slice(2).length) {
	printer.printToolOptions(program);
} else {
	program.parseAsync();
}
