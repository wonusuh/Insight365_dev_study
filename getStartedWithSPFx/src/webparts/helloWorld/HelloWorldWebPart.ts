import {
  Version,
  DisplayMode,
  Environment,
  EnvironmentType,
  Log,
} from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import type { IReadonlyTheme } from "@microsoft/sp-component-base";
import { escape } from "@microsoft/sp-lodash-subset";
import styles from "./HelloWorldWebPart.module.scss";
import * as strings from "HelloWorldWebPartStrings";

export interface IHelloWorldWebPartProps {
  description: string;
}
export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = "";

  public render(): void {
    const siteTitle: string = this.context.pageContext.web.title;
    const pageMode: string =
      this.displayMode === DisplayMode.Edit
        ? `현재 편집모드 입니다`
        : `현재 읽기모드 입니다`;
    const environmentType: string =
      Environment.type === EnvironmentType.ClassicSharePoint
        ? "현재 클리식페이지 입니다"
        : `현재 모던페이지 입니다`;

    this.context.statusRenderer.displayLoadingIndicator(
      this.domElement,
      `message`
    );
    setTimeout(() => {
      this.domElement.innerHTML = `
    <section class="${styles.helloWorld} ${
        !!this.context.sdks.microsoftTeams ? styles.teams : ""
      }">
      <div class="${styles.welcome}">
        <img alt="" src="${
          this._isDarkTheme
            ? require("./assets/welcome-dark.png")
            : require("./assets/welcome-light.png")
        }" class="${styles.welcomeImage}" />
        <h2>Well done, ${escape(
          this.context.pageContext.user.displayName
        )}!</h2>
        <div>${this._environmentMessage}</div>
        <div>Web part property value : <strong>${escape(
          this.properties.description
        )}</strong></div>
        <div>Site title : <strong>${escape(siteTitle)}</strong></div>
        <div>페이지 모드 : <strong>${escape(pageMode)}</strong></div>
        <div>환경 : <strong>${escape(environmentType)}</strong></div>
      </div>
      <div>
        <h3>Welcome to SharePoint Framework!</h3>
        <p>
        The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It's the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
        </p>
        <button type="button">Show welcome message</button>
      </div>
    </section>`;

      this.domElement
        .getElementsByTagName("button")[0]
        .addEventListener(`click`, (event: MouseEvent) => {
          event.preventDefault();
          alert(`Welcome to the SharePoint Framework!`);
        });
    }, 5000);

    Log.info(`HelloWorld`, `message`, this.context.serviceScope);
    Log.warn(`HelloWorld`, `WARNING message`, this.context.serviceScope);
    Log.error(
      `HelloWorld`,
      new Error(`Error message`),
      this.context.serviceScope
    );
    Log.verbose(`HelloWorld`, `VERBOSE message`, this.context.serviceScope);
  }

  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then((message) => {
      this._environmentMessage = message;
    });
  }

  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) {
      // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app
        .getContext()
        .then((context) => {
          let environmentMessage: string = "";
          switch (context.app.host.name) {
            case "Office": // running in Office
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentOffice
                : strings.AppOfficeEnvironment;
              break;
            case "Outlook": // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentOutlook
                : strings.AppOutlookEnvironment;
              break;
            case "Teams": // running in Teams
            case "TeamsModern":
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentTeams
                : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(
      this.context.isServedFromLocalhost
        ? strings.AppLocalEnvironmentSharePoint
        : strings.AppSharePointEnvironment
    );
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const { semanticColors } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty(
        "--bodyText",
        semanticColors.bodyText || null
      );
      this.domElement.style.setProperty("--link", semanticColors.link || null);
      this.domElement.style.setProperty(
        "--linkHovered",
        semanticColors.linkHovered || null
      );
    }
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
