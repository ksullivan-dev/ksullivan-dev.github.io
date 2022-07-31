async function addNode(name) {
    const resp = await fetch(`./partials/${name}.html`);
    const html = await resp.text();
    const el = document.getElementById(`partials-${name}`);
    el.innerHTML = html
}