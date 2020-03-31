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
                                            'data-target="#components-links-module-AppModule-a67fbf91562f7ef6e1c90012f0ef6c97"' : 'data-target="#xs-components-links-module-AppModule-a67fbf91562f7ef6e1c90012f0ef6c97"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-a67fbf91562f7ef6e1c90012f0ef6c97"' :
                                            'id="xs-components-links-module-AppModule-a67fbf91562f7ef6e1c90012f0ef6c97"' }>
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
                            </li>
                            <li class="link">
                                <a href="modules/DeviceRoutingModule.html" data-type="entity-link">DeviceRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DevicesModule.html" data-type="entity-link">DevicesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DevicesModule-ec0a032c17e1fc311432463ac128db41"' : 'data-target="#xs-components-links-module-DevicesModule-ec0a032c17e1fc311432463ac128db41"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DevicesModule-ec0a032c17e1fc311432463ac128db41"' :
                                            'id="xs-components-links-module-DevicesModule-ec0a032c17e1fc311432463ac128db41"' }>
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
                                            'data-target="#components-links-module-ForecastModule-77f5aec3b0ab1b03d8373af6eb61a117"' : 'data-target="#xs-components-links-module-ForecastModule-77f5aec3b0ab1b03d8373af6eb61a117"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ForecastModule-77f5aec3b0ab1b03d8373af6eb61a117"' :
                                            'id="xs-components-links-module-ForecastModule-77f5aec3b0ab1b03d8373af6eb61a117"' }>
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
                                            'data-target="#components-links-module-PublicModule-50a3e3b768ee0355da2594c8352da8ef"' : 'data-target="#xs-components-links-module-PublicModule-50a3e3b768ee0355da2594c8352da8ef"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PublicModule-50a3e3b768ee0355da2594c8352da8ef"' :
                                            'id="xs-components-links-module-PublicModule-50a3e3b768ee0355da2594c8352da8ef"' }>
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
                                            'data-target="#components-links-module-SharedModule-3f2c31be65725e15eb851ea2441f6ab3"' : 'data-target="#xs-components-links-module-SharedModule-3f2c31be65725e15eb851ea2441f6ab3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-3f2c31be65725e15eb851ea2441f6ab3"' :
                                            'id="xs-components-links-module-SharedModule-3f2c31be65725e15eb851ea2441f6ab3"' }>
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
                                            'data-target="#components-links-module-StationModule-a70cdb9aa75500d41ef0d0e3fb8dc1d6"' : 'data-target="#xs-components-links-module-StationModule-a70cdb9aa75500d41ef0d0e3fb8dc1d6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StationModule-a70cdb9aa75500d41ef0d0e3fb8dc1d6"' :
                                            'id="xs-components-links-module-StationModule-a70cdb9aa75500d41ef0d0e3fb8dc1d6"' }>
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
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthService.html" data-type="entity-link">AuthService</a>
                            </li>
                            <li class="link">
                                <a href="classes/Connection.html" data-type="entity-link">Connection</a>
                            </li>
                            <li class="link">
                                <a href="classes/Device.html" data-type="entity-link">Device</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeviceService.html" data-type="entity-link">DeviceService</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeviceStats.html" data-type="entity-link">DeviceStats</a>
                            </li>
                            <li class="link">
                                <a href="classes/Ephemeride.html" data-type="entity-link">Ephemeride</a>
                            </li>
                            <li class="link">
                                <a href="classes/Forecast.html" data-type="entity-link">Forecast</a>
                            </li>
                            <li class="link">
                                <a href="classes/LedService.html" data-type="entity-link">LedService</a>
                            </li>
                            <li class="link">
                                <a href="classes/Meteo.html" data-type="entity-link">Meteo</a>
                            </li>
                            <li class="link">
                                <a href="classes/MeteoData.html" data-type="entity-link">MeteoData</a>
                            </li>
                            <li class="link">
                                <a href="classes/MeteoService.html" data-type="entity-link">MeteoService</a>
                            </li>
                            <li class="link">
                                <a href="classes/MeteoStats.html" data-type="entity-link">MeteoStats</a>
                            </li>
                            <li class="link">
                                <a href="classes/TokenInterceptor.html" data-type="entity-link">TokenInterceptor</a>
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
                                    <a href="injectables/DisplayService.html" data-type="entity-link">DisplayService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HeaterService.html" data-type="entity-link">HeaterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ScreenService.html" data-type="entity-link">ScreenService</a>
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