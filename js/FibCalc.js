/*
	FibCalc.js
	Copyright (c) 2026 YttriumLab
	
	Released under the MIT License.
	https://opensource.org/licenses/MIT
	
	- This file is educational JavaScript demonstrating several programs that compute Fibonacci numbers.
	- Please refer to the license information above.
	- Have a good journey, and watch out for memory usage!
*/

var FibCalc={};

FibCalc.Recursion=function(n)
{
	//simple but slow
	
	if(n<=1) return n;
	return FibCalc.Recursion(n-1)+FibCalc.Recursion(n-2);
}

FibCalc.MemoizedRecursion=function(n,memo={})
{
	//faster!
	
	if(n in memo) return memo[n];
	if(n<=1) return n;
	
	memo[n]=
		FibCalc.MemoizedRecursion(n-1,memo)+
		FibCalc.MemoizedRecursion(n-2,memo);
	return memo[n];
}

FibCalc.Loop=function(n)
{
	//most practical
	
	if (n<=1) return n;
	var a=0;
	var b=1;
	for(var i=2;i<=n;i++)
	{
		var tmp=a+b;
		a=b;
		b=tmp;
	}
	return b;
}

FibCalc.Dp=function(n)
{
	//uses a little more memory
	
	var dp=[0,1];
	for(var i=2;i<=n;i++) dp[i]=dp[i-1]+dp[i-2];
	return dp[n];
}

FibCalc.FastDoubling=function(n)
{
	//blazingly fast, but for advanced users
	
	var FibPair=function(n)
	{
		if(n===0) return [0,1];
		var [a,b]=FibPair(Math.floor(n/2));
		var c=a*(2*b-a);
		var d=a**2+b**2;
		if(n%2===0) return [c,d]
		else return [d, c + d];
	}
	
	return FibPair(n)[0];
}
