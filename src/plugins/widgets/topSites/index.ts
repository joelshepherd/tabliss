/**
 * Top Sites Widget for Tabliss
 * Forked by Gibryon Bhojraj <gib@rederly.com>
 * ===
 * A list of Top Sites, provided by the Browser topSites API. 
 * This widget requires an optional permission that is requested only if users choose to add this Widget to their dashboard.
 * @url https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/topSites
 */
import { Config } from '../../types';
import { TopSites } from './TopSites';

const config: Config = {
    key: 'widget/top-sites',
    name: 'Top Sites',
    description: 'Quick links to your top-visited sites.',
    dashboardComponent: TopSites,
};

export default config;
