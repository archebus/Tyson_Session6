# Week 6 - Tasks

## Task 1 - Word Count
You are tasked with writing a program that will read a file and perform the following queries.
- Words
- Characters
- Lines

This will be a node.js program that will receive a command line argument which will map to the path of the file to be read.

The output format should conform to the following:
<words> <characters> <lines>

Each space, is a tab between. Example:
5   12  3

## Task 2 - Searching on Files
Write a program that will search for words within a file. These will be partial matches, for example, if I am looking for all words that contain ‘rest’, these could include ‘rest’, ‘restful’, ‘rested’.

Your program should take two command line arguments:
- file which will be searched
- the phrase that will be searched

The program should output what line and start character it was found on. For example, if we were searching for ‘rest’ and the phrase was ‘The fellow rested their elbow against the wall’, the output would look like:

'rest' found 2:12

Which indicates that the word was found on line 2, starting character 12.
 
## Task 3 - Expanding your searcher by making a webapi
Write an expressjs and mongodb application, you will need to setup the following routes:
 
* /file/:filename - POST

This endpoint will allow the user to send a file to the express js web api, the mongodb database will hold the contents of the file and have a way to map the filename to the contents.
 
* /file/:filename/search/:phrase - GET
 
The express backend server will allow a user inquire and search for words in a particular file stored in the mongodb database and return an object in the following format:
 
{
	"filename": "<name of filename>",
	"matches": [{ "line" : <line number>, "character": <starting character> }...]
}
 