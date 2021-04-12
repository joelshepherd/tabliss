import React, { FC, useEffect } from 'react';
import { Props } from './types';


export const TopSites: FC<Props> = () => {
    const namespace: typeof chrome | typeof browser = chrome === undefined ? browser : chrome;

    if (namespace === undefined) {
        return <h4>Your browser does not support Top Sites.</h4>
    }

    useEffect(() => {
        requestTopSitesPermission();
    }, []);

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
        } else if (namespace === browser) {
            console.log(await namespace.topSites.get());
        } else {
            console.error('This browser does not expose the Top Sites API.');
        }
    }

    return <div className='TopSites'>
        {}
    </div>
}