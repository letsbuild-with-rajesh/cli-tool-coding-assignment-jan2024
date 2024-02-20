# Cli tool (Coding Assignment)

### Objective
- Write a command line tool that consumes the first 20 even numbered TODO's in most performant way and output the title and whether it is completed or not.
	- TODO at index 1 can be accessed at: https://jsonplaceholder.typicode.com/todos/1
	- TODO at index 2 can be accessed at: https://jsonplaceholder.typicode.com/todos/2

### Testing
- Run test with following command
```
npm run test
```

### Docker Setup
- Run the following command to create the docker image
```
docker build -t todos-cli -f .\Dockerfile --build-arg SERVER_URL="https://jsonplaceholder.typicode.com" .
```
- Run the following command to run the image in an interactive shell and use the cli tool
```
docker run -it --entrypoint=sh todos-cli
```
 
### Commands
- To get the default tool help
```
todos-cli
```
- To get all todos (Default: 20)
```
todos-cli -gt
```
- To get all odd numbered todos (Default: 20)
```
todos-cli -gto
```
- To get all even numbered todos (Default: 20)
```
todos-cli -gte
```

#### Pull project with
`git clone git@github.com:letsbuild-with-rajesh/cli-tool-coding-assignment-jan2024`
