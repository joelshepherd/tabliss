import { API } from '../../types';

export type Data = {
    onePerDomain: boolean;
};

export type Cache = {
    topSites: Array<any>
}

export type Props = API<Data, Cache>;

export type TopSite = browser.topSites.MostVisitedURL;

export type TopSitesList = Array<TopSite>;
