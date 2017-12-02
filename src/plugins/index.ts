export * from './interfaces';
export * from './registry';

// Import core plugins
import './core/register';

// Import extra plugins with external integrations
import './extra/register';
