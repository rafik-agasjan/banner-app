(function () {
	const scriptTag = document.currentScript;
	const nextJsAppUrl = scriptTag.getAttribute("data-nextjs-url");
	const containerId = scriptTag.getAttribute("data-container-id") || "my-embedded-component-container";
	const message = scriptTag.getAttribute("data-message");

	if (!nextJsAppUrl) {
		console.error('Attribute "data-nextjs-url" is required!');
		return;
	}

	const apiUrl = `${nextJsAppUrl}/api/embed`;
	const postData = { message: message };

	fetch(apiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(postData)
	})
		.then((response) => response.text())
		.then((html) => {
			let container = document.getElementById(containerId);
			if (!container) {
				container = document.createElement("div");
				container.id = containerId;
				scriptTag.parentNode.insertBefore(container, scriptTag);
			}
			container.innerHTML = html; // Simply insert the HTML returned by the server
		})
		.catch((error) => console.error("Error loading content from Next.js app:", error));

	// Function to activate embedded content if needed
	window.activateEmbeddedContent = function (newMessage) {
		const newApiUrl = `${nextJsAppUrl}/api/embed`;
		const newPostData = { message: newMessage };
		fetch(newApiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newPostData)
		})
			.then((response) => response.text())
			.then((html) => {
				const container = document.getElementById(containerId);
				if (container) {
					container.innerHTML = html;
				}
			})
			.catch((error) => console.error("Error activating embedded content:", error));
	};

	window.deactivateEmbeddedContent = function () {
		const container = document.getElementById(containerId);
		if (container) {
			container.innerHTML = "";
		}
	};
})();
