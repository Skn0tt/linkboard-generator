interface Server {
  acronym: string;
  name: string;
  logo: string;
  href: string;
  color: string;
}

export class SearchBar {

  private serverDomRepresentations: HTMLElement[];

  constructor(
    private readonly servers: Server[],
    textInput: HTMLInputElement,
    private readonly gridOutput: HTMLDivElement
  ) {
    this.serverDomRepresentations = this.initialize();
    textInput.addEventListener("input", event => {
      const target = event.target as HTMLInputElement;
      this.onTextChange(target.value);
    });
  }

  private initialize(): HTMLElement[] {
    const domParser = new DOMParser();

    const elements = this.servers.map(server => {
      const { acronym, href, logo, name, color } = server;
      const template = `
      <a class="mdl-button mdl-cell mdl-cell--4-col-phone" style="text-decoration: none;" href="${href}">
        <div class="server-card mdl-card mdl-shadow--2dp" style="background: url('${logo}') center /cover" >
          <div class="mdl-card__title mdl-card--expand"></div>
          <div class="mdl-card__actions">
            <span class="server-card__href">${href}</span>
          </div>
        </div>
      </a>
      `
      return domParser.parseFromString(template.trim(), "text/html").body.firstChild;
    });

    this.gridOutput.append(...elements);

    return elements as HTMLElement[];
  }

  private onTextChange(newText: string) {
    this.servers.forEach((server, i) => {
      const domElement = this.serverDomRepresentations[i];
      if (this.shouldBeShown(server, newText)) {
        domElement.classList.remove("hide");
      } else {
        domElement.classList.add("hide");
      }
    });
  }

  private shouldBeShown(server: Server, text: string) {
    const { name, href, acronym } = server;
    return name.includes(text) || href.includes(text) || acronym.includes(text);
  }

}