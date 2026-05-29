/*
	main.js
	Copyright 2026 YttriumLab
	Author: YttriumLab
	Personal project license:
		- Free to use and modify for personal, non-commercial purposes
		- Do not redistribute or claim as your own work
	
	Future Plans (Author's Notes):
		no notes
*/

var App={};

App.Launch=function()
{
	App.LocalStorageGet=function(key)
	{
		var local=0;
		try {local=window.localStorage.getItem(key);} catch (exception) {}
		return local;
	}
	App.LocalStorageSet=function(key,str)
	{
		var local=0;
		try {local=window.localStorage.setItem(key,str);} catch (exception) {}
		return local;
	}

	
	App.version=VERSION;
	App.beta=BETA;
	App.debug=DEBUG;
	console.log(
		'Current version: '+App.version+'\n'+
		'Beta version: '+App.beta+'\n'+
		'Debug mode: '+App.debug);
	
	App.updateNote={};
	App.updateNote.plainText=
		'2026.05.14: Auto-save II (v.1.2.0)\n'+
		'\t- Updated auto-saving system\n'+
		'2026.05.13: Auto-save (v.1.1.0)\n'+
		'\t- Added auto-saving feature with local storage\n'+
		'2026.05.13: What’s in a name (v.1.0.1)\n'+
		'\t- Updated the page title from ‘Plain Text Editor’ to ‘Yttrium Notepad’';
	App.updateNote.Show=function(){console.log(App.updateNote.plainText);}
	
	App.CompareVersion=function(v1,v2)
	{
		/*
			Return value:
				1  -> v1 is newer
				-1 -> v2 is newer
				0  -> v1 and v2 are the same
		*/
		var a1=v1.split('.');
		var a2=v2.split('.');
		var len=Math.max(a1.length,a2.length);
		
		for(var i=0;i<len;i++)
		{
			var n1=parseInt(a1[i]||'0',10);
			var n2=parseInt(a2[i]||'0',10);
			if(n1>n2) return 1;
			if(n1<n2) return -1;
		}
		
		return 0;
	}
	
	App.console={};
	App.console.logs=[];
	App.console.Clear=function()
	{
	        App.console.logs=[];
	        App.console.Update();
	}
	App.console.WriteLog=function(what)
	{
		var now=new Date().toISOString();
		if(App.debug) console.log(now+': '+what);
		else
		{
			App.console.logs.push(now+': '+what);
			App.console.Update();
		}
	}
	App.console.Update=function()
	{
		while(App.console.logs.length>1000) App.console.logs.shift();
		//App.console.Render();
	}
	
	App.editor=l('editor');//get the textarea element (see line 15 of Utils.js)
	
	AddEvent(App.editor,'keydown',function(e)
	{
		//console.log('Keydown event triggered. keyCode: '+e.keyCode);
		
		if(e.keyCode==9)
		{
			e.preventDefault();
			App.EnterTab();
		}
		if(e.ctrlKey&&e.keyCode==83)
		{
			e.preventDefault();
			App.FileSave(App.editor.value);
		}
	});
	App.EnterTab=function()
	{
		var start=App.editor.selectionStart;
		var end=App.editor.selectionEnd;
		App.editor.value=App.editor.value.substring(0,start)+'\t'+App.editor.value.substring(end);
		App.editor.selectionStart=App.editor.selectionEnd=start+1;
		//console.log('Enter a tab');
	}
	App.FileSave=function(value)
	{
		var blob=new Blob([value],{type:'text/plain'});
		if(typeof saveAs==='undefined')
		{
			console.log('Failed to export the file! saveAs is not defined.');
			return;
		}
		saveAs(blob,'text.txt');//file save function from https://github.com/eligrey/FileSaver.js
	}
	App.SetTabSize=function(value)
	{
		/*
			If you have access to the console, you can easily set your preferred tab size.
			The feature to change this on the screen will be implemented soon.
		*/
		App.editor.style.tabSize=value;
		console.log('Set the tab size to '+value);
		App.LocalStorageSet('YttriumNotepad-tabSize',App.editor.style.tabSize);
	}
	App.SetFont=function(font)
	{
		/*
			If you have access to the console, you can easily set your preferred font.
			The feature to change this on the screen will be implemented soon.
		*/
		//Default font: Cormorant Garamond
		App.editor.style.fontFamily=font;
		console.log('Set the font to '+font);
		App.LocalStorageSet('YttriumNotepad-font',App.editor.style.fontFamily);
	}
	App.SetFontSize=function(size)
	{
		/*
			If you have access to the console, you can easily set your preferred font size.
			The feature to change this on the screen will be implemented soon.
		*/
		//Aren't you all getting a little annoyed from seeing the same text three times?
		//Default font size: 12px
		App.editor.style.fontSize=size;
		console.log('Set the font size to '+size);
		App.LocalStorageSet('YttriumNotepad-fontSize',App.editor.style.fontSize);
	}
	
	App.SetTabSize(8);
	
	AddEvent(App.editor,'input',function()
	{
		App.LocalStorageSet('YttriumNotepad-version',App.version);
		App.LocalStorageSet('YttriumNotepad-content',App.editor.value);
		//console.log('Saved to local storage');
	});
	
	console.log(
		'Keyboard shortcuts:\n'+
		'\tPress Ctrl+S to save the file\n'+
		'\tPress the Tab key to insert a tab');
	
	App.LoadSave=function()
	{
		//get save data from local storage
		var v=App.LocalStorageGet('YttriumNotepad-version')||'';
		if(App.CompareVersion(App.version,v)>=0)
		{
			App.editor.value=App.LocalStorageGet('YttriumNotepad-content')||'';
			App.editor.style.fontFamily=App.LocalStorageGet('YttriumNotepad-font')||'Cormorant Garamond';
			App.editor.style.fontSize=App.LocalStorageGet('YttriumNotepad-fontSize')||'12px';
			App.editor.style.tabSize=App.LocalStorageGet('YttriumNotepad-tabSize')||'8';
			
			if(App.editor.value) console.log('Save data loaded!');
		}
		else
		{
			App.editor.value='';
			App.editor.style.fontFamily='Cormorant Garamond';
			console.log('Failed to load the save data.');
		}
	}
	App.LoadSave();
}

window.onload=function()
{
	App.Launch();
	
	console.log(
		'Powered by FileSaver.js - thank you to Eli Grey and the contributors for this awesome library!\n'+
		'https://github.com/eligrey/FileSaver.js');
	console.log(
		'=====================================================================================\n'+
		'\tLoading complete\n'+
		'=====================================================================================');
}
