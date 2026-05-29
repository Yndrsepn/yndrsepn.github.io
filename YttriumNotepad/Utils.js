/*
	Utils.js
	Copyright (c) 2026 YttriumLab
	
	Released under the MIT License.
	https://opensource.org/licenses/MIT
*/

var Utils={};

/*=======================================================================================
	DOM MANIPULATION
=======================================================================================*/

Utils.l=function(_what){return document.getElementById(_what);}

Utils.AddEvent=function(_el,_ev,_func)
{
	if(_el.addEventListener){_el.addEventListener(_ev,_func,false);return [_el,_ev,_func];}
	else if(_el.attachEvent){var func2=function(){_func.call(_el);};_el.attachEvent('on'+_ev,func2);return [_el,_ev,_func2];}
	return false;
}
Utils.RemoveEvent=function(_evObj)
{
	if(!_evObj) return false;
	if(_evObj[0].removeEventListener) _evObj[0].removeEventListener(_evObj[1],_evObj[2],false);
	else if(_evObj[0].detachEvent) _evObj[0].detachEvent('on'+_evObj[1],_evObj[2]);
	return true;
}

/*=======================================================================================
	TEXT EDITING
=======================================================================================*/

Utils.EscapeRegExp=function(_str){return _str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");}
Utils.ReplaceAll=function(_find,_replace,_str){return _str.replace(new RegExp(Utils.EscapeRegExp(_find),'g'),_replace);}

Utils.Lig=function(_str)
{
	var result=_str;
	
	result=Utils.ReplaceAll('ffi','&#xFB03;',result);
	result=Utils.ReplaceAll('ffl','&#xFB04;',result);
	result=Utils.ReplaceAll('fi','&#xFB01;',result);
	result=Utils.ReplaceAll('fl','&#xFB02;',result);
	result=Utils.ReplaceAll('ff','&#xFB00;',result);
	
	return result;
}

Utils.utf8_to_b64=function(_str)
{
	try
	{
		return btoa(encodeURIComponent(_str).replace(
			/%([0-9A-F]{2})/g,function(_match,_p1)
			{
				return String.fromCharCode(parseInt(_p1,16))
			})
		);
	}
	catch(err)
	{return '';}
}

Utils.b64_to_utf8=function(_str)
{
	try
	{
		return decodeURIComponent(Array.prototype.map.call(
			atob(_str),function(_c)
			{
				return '%'+('00'+_c.charCodeAt(0).toString(16)).slice(-2)
			}).join('')
		);
	}
	catch(err)
	{return '';}
}

/*=======================================================================================
	USEFUL TOOLS
=======================================================================================*/

Utils.choose=function(_arr){return _arr[Math.floor(Math.random()*_arr.length)];}

Utils.Romanize=function(_num)
{
	if (isNaN(_num))
		return NaN;
	var digits=String(+_num).split(''),
		key=
		[
			'','C','CC','CCC','CD','D','DC','DCC','DCCC','CM',
			'','X','XX','XXX','XL','L','LX','LXX','LXXX','XC',
			'','I','II','III','IV','V','VI','VII','VIII','IX',
		],
		roman='',
		i=3;
		while(i--)
		{
			roman=(key[+digits.pop()+(i*10)]||'')+roman;
		}
		return Array(+digits.join('')+1).join('M')+roman;
}
