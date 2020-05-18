'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">meteo-station-domotique documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-a5d77b3a1f036e1df808f9e97720ef80"' : 'data-target="#xs-components-links-module-AppModule-a5d77b3a1f036e1df808f9e97720ef80"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-a5d77b3a1f036e1df808f9e97720ef80"' :
                                            'id="xs-components-links-module-AppModule-a5d77b3a1f036e1df808f9e97720ef80"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CoreModule-53e510902f20eab977de7fe73eceda0e"' : 'data-target="#xs-injectables-links-module-CoreModule-53e510902f20eab977de7fe73eceda0e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CoreModule-53e510902f20eab977de7fe73eceda0e"' :
                                        'id="xs-injectables-links-module-CoreModule-53e510902f20eab977de7fe73eceda0e"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DeviceService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DeviceService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DisplayService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DisplayService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MeteoService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MeteoService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DeviceRoutingModule.html" data-type="entity-link">DeviceRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DevicesModule.html" data-type="entity-link">DevicesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DevicesModule-14b7ea46d69589f825f764bef5f4805f"' : 'data-target="#xs-components-links-module-DevicesModule-14b7ea46d69589f825f764bef5f4805f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DevicesModule-14b7ea46d69589f825f764bef5f4805f"' :
                                            'id="xs-components-links-module-DevicesModule-14b7ea46d69589f825f764bef5f4805f"' }>
                                            <li class="link">
                                                <a href="components/DetailDeviceComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DetailDeviceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListDevicesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListDevicesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MeteoStationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MeteoStationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MeteoStatsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MeteoStatsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MeteoStatsGraphicComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MeteoStatsGraphicComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PlayLedComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PlayLedComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ForecastModule.html" data-type="entity-link">ForecastModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ForecastModule-3fb259ac34815c3b7ad9203a486bbd5e"' : 'data-target="#xs-components-links-module-ForecastModule-3fb259ac34815c3b7ad9203a486bbd5e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ForecastModule-3fb259ac34815c3b7ad9203a486bbd5e"' :
                                            'id="xs-components-links-module-ForecastModule-3fb259ac34815c3b7ad9203a486bbd5e"' }>
                                            <li class="link">
                                                <a href="components/ForecastDaysComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ForecastDaysComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ForecastDetailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ForecastDetailComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProtectedModule.html" data-type="entity-link">ProtectedModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProtectedRoutingModule.html" data-type="entity-link">ProtectedRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PublicModule.html" data-type="entity-link">PublicModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PublicModule-b6ecaaef4c317e8fc857e44b98308df6"' : 'data-target="#xs-components-links-module-PublicModule-b6ecaaef4c317e8fc857e44b98308df6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PublicModule-b6ecaaef4c317e8fc857e44b98308df6"' :
                                            'id="xs-components-links-module-PublicModule-b6ecaaef4c317e8fc857e44b98308df6"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LogoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LogoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UnauthenticatedComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UnauthenticatedComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PublicRoutingModule.html" data-type="entity-link">PublicRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-9fdb9a1b0f3f3cf39bbef94da0a66942"' : 'data-target="#xs-components-links-module-SharedModule-9fdb9a1b0f3f3cf39bbef94da0a66942"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-9fdb9a1b0f3f3cf39bbef94da0a66942"' :
                                            'id="xs-components-links-module-SharedModule-9fdb9a1b0f3f3cf39bbef94da0a66942"' }>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StationModule.html" data-type="entity-link">StationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StationModule-74a4c8621d3424fac0aea89bfdfff61f"' : 'data-target="#xs-components-links-module-StationModule-74a4c8621d3424fac0aea89bfdfff61f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StationModule-74a4c8621d3424fac0aea89bfdfff61f"' :
                                            'id="xs-components-links-module-StationModule-74a4c8621d3424fac0aea89bfdfff61f"' }>
                                            <li class="link">
                                                <a href="components/StationCommandComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StationCommandComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StationDetailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StationDetailComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AccountIo.html" data-type="entity-link">AccountIo</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/Connection.html" data-type="entity-link">Connection</a>
                            </li>
                            <li class="link">
                                <a href="classes/Device.html" data-type="entity-link">Device</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeviceIo.html" data-type="entity-link">DeviceIo</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeviceStats.html" data-type="entity-link">DeviceStats</a>
                            </li>
                            <li class="link">
                                <a href="classes/EnvironmentDetail.html" data-type="entity-link">EnvironmentDetail</a>
                            </li>
                            <li class="link">
                                <a href="classes/Ephemeride.html" data-type="entity-link">Ephemeride</a>
                            </li>
                            <li class="link">
                                <a href="classes/Forecast.html" data-type="entity-link">Forecast</a>
                            </li>
                            <li class="link">
                                <a href="classes/ForecastEnv.html" data-type="entity-link">ForecastEnv</a>
                            </li>
                            <li class="link">
                                <a href="classes/MeteoData.html" data-type="entity-link">MeteoData</a>
                            </li>
                            <li class="link">
                                <a href="classes/MeteoStats.html" data-type="entity-link">MeteoStats</a>
                            </li>
                            <li class="link">
                                <a href="classes/ThingerIoEnv.html" data-type="entity-link">ThingerIoEnv</a>
                            </li>
                            <li class="link">
                                <a href="classes/TokenDetail.html" data-type="entity-link">TokenDetail</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeviceService.html" data-type="entity-link">DeviceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DisplayService.html" data-type="entity-link">DisplayService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EnvironmentService.html" data-type="entity-link">EnvironmentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MeteoService.html" data-type="entity-link">MeteoService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/TokenInterceptor.html" data-type="entity-link">TokenInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});