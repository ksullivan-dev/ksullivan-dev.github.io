async function addNode(name) {
  const converter = new showdown.Converter();
  let resp;
  let useMarkdown = false;
  resp = await fetch(`./partials/${name}.md`);
  if (resp.ok) {
    useMarkdown = true;
  } else {
    resp = await fetch(`./partials/${name}.html`);
  }

  const text = await resp.text();
  const html = useMarkdown ? converter.makeHtml(text) : text;
  const el = document.getElementById(`partials-${name}`);
  el.innerHTML = html;
}
