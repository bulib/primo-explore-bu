const helpMenuHeadContent = `
  <md-button ng-hide="!entry" class="md-icon-button md-button md-primoExplore-theme md-ink-ripple" ng-click="back()">
    <prm-icon icon-type="svg" svg-icon-set="navigation" icon-definition="ic_arrow_back_24px"
              aria-label="return to help content list" ></prm-icon>
  </md-button>
  <h1>
    <strong ng-if="helpMenuTitle">{{helpMenuTitle}}</strong>
    <strong ng-hide="helpMenuTitle">Search Help</strong>
    <span ng-hide="!entry"> - {{entry.title}}</span>
  </h1>`;

const helpMenuMainContent = `
  <div ng-if="entry" id="search-help-menu-content" tabindex="-1">
    <br />
    <p ng-if="!entry.template"><em>{{entry.description}}</em></p>
    <div ng-bind-html="entry.template"></div>
  </div>
  <h2 ng-hide="entry || !helpContentUpdates">{{updatesLabel}}</h2>
  <ul ng-hide="entry || !helpContentUpdates" style="list-style: none; width: 100%; padding-left: 0px;">
    <hr aria-hidden="true" />
    <li ng-repeat="item in helpContentUpdates" class="row">
      <a ng-if="item.id" href="#{{item.id}}">
        <prm-icon svg-icon-set="{{item.icon.group}}" icon-definition="ic_{{item.icon.code}}_24px"
                  icon-type="svg" style="padding-right: 10px;"></prm-icon>
        {{item.title}}
      </a>
      <hr ng-if="!item.id" aria-hidden="true" />
    </li>
    <hr aria-hidden="true" />
  </ul>
  <h2 ng-hide="entry || !helpContentList || !helpContentUpdates">{{entriesLabel}}</h2>
  <ul ng-hide="entry || !helpContentList" style="list-style: none; width: 100%; padding-left: 0px;">
    <hr aria-hidden="true" />
    <li ng-repeat="item in helpContentList" class="row">
      <a ng-if="item.id" href="#{{item.id}}">
        <prm-icon svg-icon-set="{{item.icon.group}}" icon-definition="ic_{{item.icon.code}}_24px"
                  icon-type="svg" style="padding-right: 10px;"></prm-icon>
        {{item.title}}
      </a>
      <hr ng-if="!item.id" aria-hidden="true" />
    </li>
    <hr aria-hidden="true" />
  </ul>`;

export const helpMenuContentDisplayTemplate = `
  <style>
    help-menu-content-display { font-size: 140%; margin-bottom: 5px;}
    #help-header { background-color: lightgrey; }
    #help-content { padding: 0px 25px; }
    prm-static-page > prm-static > div { display: none; }
  </style>
  <div id="help-header" class="md-toolbar-tools">${helpMenuHeadContent}</div>
  <div id="help-content">${helpMenuMainContent}</div>`;

export const helpMenuDialogTemplate = (width) => `
  <md-dialog id="search-help-dialog" aria-label="Search Help Menu Dialog" style="width: ${width}px;">
    <form>
      <md-toolbar>
        <div class="md-toolbar-tools">
          ${helpMenuHeadContent}
          <span flex></span>
          <md-button class="md-icon-button md-button md-primoExplore-theme md-ink-ripple" ng-click="hide()">
            <prm-icon aria-label="Close dialog" icon-type="svg" svg-icon-set="navigation" icon-definition="ic_close_24px"></prm-icon>
          </md-button>
        </div>
      </md-toolbar>
      <md-dialog-content>
        <div class="md-dialog-content">${helpMenuMainContent}</div>
      </md-dialog-content>
      <md-dialog-actions layout="row">
        <md-button ng-click="openHelpInNewWindow(entry.id)">Open in New Window</md-button>
      </md-dialog-actions>
    </form>
  </md-dialog>`;