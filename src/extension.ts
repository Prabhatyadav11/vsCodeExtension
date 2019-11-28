import * as vscode from 'vscode';
import axios from 'axios';

const branch = require('git-branch');
var repoName = require('git-repo-name');
var inActiveTime:Date;
var activeTime:Date;
var userName=require('git-user-name');

var url = "http://localhost:3600";

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "gitswirlvscodeextension" is now active!');
	var swirlUser:String = userName ();
	console.log(swirlUser) ;
	/**
	 * Finding the repository and branch name
	 */
	let folderPath = vscode.workspace.rootPath;
	let disposable = vscode.commands.registerCommand('extension.timecheck', () => {

		if (folderPath) {
            branch(`${folderPath}`)
                .then((branchName: String) => {
                    repoName(folderPath, function (err: String, repoName: String) {
						vscode.window.setStatusBarMessage( swirlUser +  "  GitSwirl [Repository]:=>  " + repoName + " [Branch]:=> " + branchName  );
						console.log(repoName,"reponame",  branchName,"branchName" );

						axios.post(url+"/vscode_extension", {
							branchName,
							repoName
						}).then( response => {
							console.log(response,"this is response");
						});
					});
					
						})
				.catch(console.error);
        }
        else {
			vscode.window.setStatusBarMessage("NO REPO Please Enter Into A Repo");
			vscode.window.showInformationMessage('Enter Into Repo please!!');
        }
        
	});
	
	

	vscode.window.showInformationMessage('Hello TimeCheck Actived');
	
	/**
	 * focus and outOfFocus Time
	 */
	vscode.window.onDidChangeWindowState((item) => {

			if (item.focused === true) {
				let inFocus:Date = new Date();
				activeTime = inFocus ;
				console.log(inFocus,"this is focus time");

				axios.post(url+'/vscode_extension', {
					inActiveTime
				}).then( response => {
					console.log(response);
				});
					
			 }
			else if (item.focused === false) {
				let outOfFocus:Date = new Date();

				axios.post(url+'/vscode_extension', {
					activeTime
				}).then( response => {
					console.log(response);
				});

				 inActiveTime =  outOfFocus;
				console.log(outOfFocus,"this is infocus time");
			}

			console.log(activeTime,"this is the active time", inActiveTime,"this is in inacvtive time");
			});	

			
}

export function deactivate(){}
	

