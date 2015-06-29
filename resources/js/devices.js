/*!
 * device detection 
 * Peter Nitsch - last mod 2010-05-11
 */

var deviceIphone = "iphone";
var deviceIpod = "ipod";
var deviceIpad = "ipad";
var deviceBB = "blackberry";
var deviceAndroid = "android";

var uagent = navigator.userAgent.toLowerCase();

function detectIphone() {
	if (uagent.search(deviceIphone) > -1) return true;
	else return false;
}

function detectIpod() {
	if (uagent.search(deviceIpod) > -1) return true;
	else return false;
}

function detectIpad() {
	if (uagent.search(deviceIpad) > -1) return true;
	else return false;
}

function detectIproduct() {
    if (detectIphone()) return true;
    else if (detectIpod()) return true;
	else if (detectIpad()) return true;
    else return false;
}

function detectBlackBerry() {
	if (uagent.search(deviceBB) > -1) return true;
	else return false;
}

function detectAndroid() {
	if (uagent.search(deviceAndroid) > -1) return true;
	else return false;
}

function isDevice(){
	if(detectIproduct() || detectBlackBerry() || detectAndroid()) return true;
	else return false;
}

function isPhone(){
	if(detectIpod() || detectIphone() || detectBlackBerry() || detectAndroid()) return true;
	else return false;
}

function device(){
	if(detectIphone()) return deviceIphone;
	else if(detectIpad()) return deviceIpad;
	else if(detectBlackBerry()) return deviceBB;
	else if(detectAndroid()) return deviceAndroid;
}