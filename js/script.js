function crossBrowserCSS(elem, attr, value) {
	elem.css(attr,value);
	elem.css('-ms-'+attr,value);
	elem.css('-moz-'+attr,value);
	elem.css('-webkit-'+attr,value);
}