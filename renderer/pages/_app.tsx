/*
 * Venture, an open-source Discord client focused on speed and convenience.
 * Copyright (c) 2023 Zyrenth
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import '../styles/globals.css';

import React from 'react';

import ErrorFallback from '../components/Base/ErrorBoundaries/_base';
import ErrorBoundary from '../components/Base/ErrorBoundaries/_react';

export default function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout ?? ((page) => page);

    // @ts-ignore
    return <ErrorBoundary fallback={<ErrorFallback />}>{getLayout(<Component {...pageProps} />)}</ErrorBoundary>;
}
