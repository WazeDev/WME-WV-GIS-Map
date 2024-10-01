// ==UserScript==
// @name         WME WV GIS Map
// @namespace    https://greasyfork.org/users/45389
// @version      2024.09.30.001
// @description  Open a WV GIS map in another window, at the same location as the WME map.  Keeps the location of the GIS map synced to WME.
// @author       MapOMatic
// @include     /^https:\/\/(www|beta)\.waze\.com\/(?!user\/)(.{2,6}\/)?editor\/?.*$/
// @include     /^https?:\/\/www\.arcgis\.com\/home\/webmap\/viewer\.html\?webmap=6f496afe68024189b54d823e09550ced.*/
// @license      GNU GPLv3
// @require      https://cdn.jsdelivr.net/npm/@turf/turf@7/turf.min.js
// @icon         data:image/png;base64,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
// ==/UserScript==

/* global W */
/* global turf */

(function main() {
    'use strict';

    const debugLevel = 0;
    let mapWindow;
    let Extent;
    let SpatialReference;
    let receiverAdded = false;

    function log(message, level) {
        if (message && level <= debugLevel) {
            console.log('WV GIS:', message);
        }
    }

    function getMercatorMapExtent() {
        const wgs84Extent = W.map.getExtent();
        const wgs84LeftBottom = [wgs84Extent[0], wgs84Extent[1]];
        const wgs84RightTop = [wgs84Extent[2], wgs84Extent[3]];
        const mercatorLeftBottom = turf.toMercator(wgs84LeftBottom);
        const mercatorRightTop = turf.toMercator(wgs84RightTop);
        return [mercatorLeftBottom[0], mercatorLeftBottom[1], mercatorRightTop[0], mercatorRightTop[1]];
    }

    function onButtonClick() {
        const wazeExt = getMercatorMapExtent();
        let url = 'http://www.arcgis.com/home/webmap/viewer.html?webmap=6f496afe68024189b54d823e09550ced&extent=';
        url += `${wazeExt[0]}%2C${wazeExt[1]}%2C${wazeExt[2]}%2C${wazeExt[3]}%2C102113`;
        if (!mapWindow || mapWindow.closed) {
            mapWindow = window.open(null, 'wv_gis_map');
            try {
                if (mapWindow.location && mapWindow.location.href) {
                    mapWindow.location.assign(url);
                }
            } catch (ex) {
                if (ex.code === 18) {
                    // Ignore if accessing location.href is blocked by cross-domain.
                } else {
                    throw ex;
                }
            }
        }
        mapWindow.focus();
        syncGISMapExtent(mapWindow);
    }

    function syncGISMapExtent(myMapWindow) {
        if (myMapWindow && !myMapWindow.closed) {
            const wazeExt = getMercatorMapExtent();
            try {
                myMapWindow.postMessage({
                    type: 'setExtent',
                    xmin: wazeExt[0],
                    xmax: wazeExt[2],
                    ymin: wazeExt[1],
                    ymax: wazeExt[3],
                    spatialReference: 102113
                }, 'https://www.arcgis.com');
            } catch (ex) {
                log(ex, 0);
            }
        }
    }

    function init() {
        $('.WazeControlPermalink').prepend(
            $('<div>').css({ float: 'left', display: 'inline-block', padding: '0px 5px 0px 3px' }).append(
                $('<a>', { id: 'wv-gis-button', title: 'Open the WV GIS map in a new window', href: 'javascript:void(0)' })
                    .text('WVGIS')
                    .css({
                        float: 'left', textDecoration: 'none', color: '#000000', fontWeight: 'bold'
                    })
                    .click(onButtonClick)
            )
        );

        setInterval(() => {
            const $btn = $('#wv-gis-button');
            if ($btn.length > 0) {
                $btn.css('color', (mapWindow && !mapWindow.closed) ? '#1e9d12' : '#000000');
            }
        }, 500);

        /* Event listeners */
        W.map.events.register('moveend', null, () => { syncGISMapExtent(mapWindow); });

        log('Initialized.', 1);
    }

    function receiveMessageGIS(event) {
        log(event, 1);
        const { data } = event;
        if (!Extent) {
            Extent = unsafeWindow.require('esri/geometry/Extent');
            SpatialReference = unsafeWindow.require('esri/SpatialReference');
        }
        switch (data.type) {
            case 'setExtent':
        }

        const { map } = unsafeWindow.arcgisonline.map.main;
        const ext = new Extent({
            xmin: data.xmin, xmax: data.xmax, ymin: data.ymin, ymax: data.ymax, spatialReference: new SpatialReference({ wkid: data.spatialReference })
        });
        unsafeWindow.arcgisonline.map.main.map.setExtent(ext);
    }

    function receiveMessageWME(event) {
        // TBD
    }

    function bootstrap() {
        if (window.location.host.toLowerCase() === 'www.arcgis.com') {
            window.addEventListener('message', receiveMessageGIS, false);
        } else {
            if (!receiverAdded) {
                window.addEventListener('message', receiveMessageWME, false);
                receiverAdded = true;
            }
            if (W && W.loginManager
                && W.loginManager.events.register
                && W.map) {
                log('Initializing...', 1);
                init();
            } else {
                log('Bootstrap failed. Trying again...', 1);
                window.setTimeout(() => {
                    bootstrap();
                }, 200);
            }
        }
    }

    log('Bootstrap...', 1);
    bootstrap();
})();
