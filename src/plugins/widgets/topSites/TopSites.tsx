import React, { FC, useEffect, useState } from 'react';
import { Props, TopSitesList } from './types';
import RectSiteBox from './RectSiteBox';
import './TopSites.sass';

export const TopSites: FC<Props> = () => {
    const namespace: typeof chrome | typeof browser = chrome === undefined ? browser : chrome;
    const [topSites, setTopSites] = useState<TopSitesList>([]);

    // On mount, check for permissions and request if they aren't present.
    useEffect(() => {
        requestTopSitesPermission();
    }, []);

    if (namespace === undefined) {
        return <h4>Your browser does not support Top Sites.</h4>
    }

    const requestTopSitesPermission = async () => {
        try {
            const res = await namespace.permissions.request({
                permissions: ['topSites']
            });
            console.log('Successfully got permissions', res);
        } catch (e) {
            // TODO: Error handling? Undo widget add?
            console.error('Failed to get TopSites permissions.', e);
            return;
        }

        if (namespace === chrome) {
            namespace.topSites.get(console.log);
            namespace.topSites.get(setTopSites);
        } else if (namespace === browser) {
            console.log(await namespace.topSites.get());
            setTopSites(await namespace.topSites.get());
        } else {
            console.error('This browser does not expose the Top Sites API.');
        }
    }

    return <div className='TopSites-flexcontainer'>
        {topSites.map((site) => <RectSiteBox site={site} />)}
    </div>
}