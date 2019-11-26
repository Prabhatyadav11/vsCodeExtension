import * as vscode from 'vscode';
import axios from 'axios';
const branch = require('git-branch');
var repoName = require('git-repo-name');
export function activate(context: vscode.ExtensionContext) {
	let folderPath = vscode.workspace.rootPath;
    console.log('Congratulations, your extension "gitswirlvscodeextension" is now active!');
	var active_time: any = [];
	var active_time_stamp: any = [1];
	var inactive_time: any = [];
	let disposable = vscode.commands.registerCommand('extension.timecheck', () => {
		if (folderPath) {
            branch(`${folderPath}`)
                .then((name: String) => {
                    repoName(folderPath, function (err: String, repoName: String) {
						vscode.window.setStatusBarMessage("GitSwirl [Repository]:=> " + repoName + " [Branch]:=> " + name  );
						console.log(repoName,"reponame",  name,"branchName", inactive_time,"inactive time", active_time,"active time" );
					});
					
				
						})
				.catch(console.error);
				
        }
        else {
			vscode.window.setStatusBarMessage("NO REPO Please Enter Into A Repo");
			vscode.window.showInformationMessage('Enter Into Repo please!!');
        }
        
    });
		console.log(inactive_time, "this is the inactive");
		var star_time: any = new Date();
		var inFocus: any = new Date();
		var outOfFocus: any = new Date();
		let total = 0;
		let total1 = 0;
		vscode.window.showInformationMessage('Hello TimeCheck Actived');
			vscode.window.onDidChangeWindowState((item) => {
			if (item.focused === true) {
				let temp = new Date();
				inFocus = temp;
				inactive_time.push(inFocus - active_time_stamp[0]);
				for (let i = 0; i < inactive_time.length; i++) {
					total += inactive_time[i];
					}
				var secDiff1 = Math.floor(total / 1000); //in sec
				var hDiff1 = Math.floor(secDiff1 / 3600); //in hours
				secDiff1 = secDiff1 % 3600;
				var minDiff1 = Math.floor(secDiff1 / 60); //in minutes
				secDiff1 = secDiff1 % 60;
				console.log(hDiff1 + ':' + minDiff1 + ':' + secDiff1, "Total InactiveTime Worked");
				
			 }
			if (item.focused === false) {
				let temp = new Date();
				outOfFocus = temp;
				active_time.push(outOfFocus - inFocus);
				active_time_stamp[0] = outOfFocus;
				for (let i = 0; i < active_time.length; i++) {
					total1 += active_time[i];
					}
				var secDiff = Math.floor(total1 /1000); //in sec
				var hDiff = Math.floor(secDiff / 360000); //in hours
				secDiff = secDiff % 3600;
				var minDiff = Math.floor(secDiff / 60); //in minutes
				secDiff = secDiff % 60;
				console.log(hDiff + ':' + minDiff + ':' + secDiff, "Total Time Worked");
				
			}
		});
	}

export function deactivate() { }