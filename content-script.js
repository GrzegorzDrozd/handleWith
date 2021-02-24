(function(){

	if (typeof window.Handle_with_hasRun !== 'undefined'){
		return;
	}
	window.Handle_with_hasRun = true;

	console.log('Handle-with loaded');
	

	function getClosestANCOR(node){
		while(	
			node !== null 
			&& node.tagName !== 'A'
		) {
			node = node.parentNode;
		}
		return node;
	}

	function simulateClick(elem) {
		const evt = new MouseEvent('click', {
			bubbles: false,
			cancelable: false,
			view: window
		});
		elem.dispatchEvent(evt);
	}

	browser.runtime.onMessage.addListener( (message) => {

		console.log(message.mode);

		const clickTarget = browser.menus.getTargetElement(message.targetElementId);

		const ancor = getClosestANCOR(clickTarget);

		//console.log(JSON.stringify(clickTarget));

		console.log(ancor.href);
		if(ancor === null || typeof ancor.href !== 'string'){
			alert('No clickTarget found!');
			return;
		}

		
		// add empty data link
		let link = document.createElement('a');
		link.style.display = 'none';
		link.setAttribute('target', '_blank');
		//link.setAttribute('download', 'handle-with');
		document.body.append(link);

		//link.setAttribute('href','data:text/csv;charset=utf-8,'+clickTarget.href);
		//link.setAttribute('href','handle-with://'+encodeURIComponent(clickTarget.href));
		alert(message.mode + '://' + ancor.href);
		link.setAttribute('href', message.mode + '://' + ancor.href);
		simulateClick(link);

		///setTimeout(function() {
			link.remove();
		//},5000);
	});


}());