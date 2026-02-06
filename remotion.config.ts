import { Config } from '@remotion/cli/config';
import path from 'path';

Config.setPublicDir(path.resolve(process.cwd(), 'public'));
