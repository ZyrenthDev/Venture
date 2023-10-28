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

import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import DMTab from '../components/Home/DMTab';
import Page from '../components/Home/Page';
import Sidebar from '../components/Home/Sidebar';
import DMUser from '../components/Home/User';
import ServerListItem from '../components/Serverlist/LisItem';
import ServerList from '../components/Serverlist/list';
import Api from '../utilities/api/api';
import apiConfig from '../utilities/config/apiConfig';
import defaultUser from '../utilities/config/defaultUser';
import mergeObjects from '../utilities/objectMerger';
import VenturePack from '../utilities/pack/venturePack';
import User from '../utilities/types/User';

function NextPage() {
    return <></>;
}

NextPage.getLayout = function getLayout() {
    const router = useRouter();
    const [token, setToken] = useState<string>(null);
    const [venturePack, setVP] = useState<VenturePack>(null);
    const [user, setUser] = useState<User>(defaultUser);

    const init = async (window) => {
        const token = window.localStorage.getItem('token');
        setToken(token);

        if (!token) {
            router.push('/');
            return;
        }

        const _vp = new VenturePack(window);

        setVP(_vp);
    };

    useEffect(() => {
        init(window);
    }, []);

    const api = new Api(apiConfig, token);

    const fetchData = async () => {
        if (user.id !== '-1') return;
        if (!api.token) return;

        if (venturePack.searchPack('currentUser')) return setUser(venturePack.searchPack('currentUser')[3]);

        const res = await api.get(`/users/${atob(localStorage.getItem('token').split('.')[0])}/profile`);

        const response = res.data;

        const usrdata = mergeObjects(response?.user, response?.user_profile, {
            premium_since: response?.premium_since,
            premium: response?.premium,
            premium_type: response?.premium_type,
        });

        setUser(usrdata);
        venturePack.createPackItem('currentUser', usrdata);
    };

    useEffect(() => {
        fetchData();
    });

    return (
        <React.Fragment>
            <Head>
                <title>Venture Client</title>
            </Head>
            <div id="app" className="_app App__VentureApp">
                <ServerList isHomeSelected>
                    <ServerListItem iconUrl="/images/Icon.png" isSelected={false} hasNewMessages={true} />
                    <ServerListItem iconUrl="/images/Icon.png" isSelected={false} hasNewMessages={false} />
                    <ServerListItem iconUrl="/images/Icon.png" isSelected={false} hasNewMessages={true} />
                    <ServerListItem iconUrl="/images/Icon.png" isSelected={false} hasNewMessages={false} />
                    <ServerListItem iconUrl="/images/Icon.png" isSelected={false} hasNewMessages={true} />
                    <ServerListItem iconUrl="/images/Icon.png" isSelected={false} hasNewMessages={false} />
                    <ServerListItem iconUrl="/images/Icon.png" isSelected={false} hasNewMessages={false} />
                </ServerList>

                <div className="App__BodyContainer">
                    <Sidebar
                        user={{
                            username: user.global_name,
                            avatarUrl: user.avatar
                                ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
                                : '/images/logo.png',
                            status: 'really, its unreal real',
                        }}
                        tabs={
                            <>
                                <DMTab name="Home" icon="home" isSelected />
                                <DMTab name="Friends" icon="groups" notificationCount={6} href="/app" />
                                <DMTab name="Marketplace" icon="store" />
                                <DMTab name="Discover" icon="explore" />
                            </>
                        }
                        pinnedDMs={[
                            <DMUser
                                key={0}
                                user={{
                                    username: 'Venture Music',
                                    avatarUrl: '/images/logo.png',
                                }}
                                rpc={{
                                    name: 'Spotify',
                                    type: 'LISTENING',
                                }}
                            />,
                            <DMUser
                                key={1}
                                user={{
                                    username: 'Pinned DM',
                                    avatarUrl: '/images/logo.png',
                                }}
                                status="its really pinned"
                            />,
                        ]}
                    >
                        <></>
                        <DMUser
                            user={{
                                username: 'Venture',
                                avatarUrl: '/images/logo.png',
                            }}
                            rpc={{
                                name: 'Venture Client',
                                type: 'PLAYING',
                            }}
                        />

                        <DMUser
                            user={{
                                username: 'Venture',
                                avatarUrl: '/images/logo.png',
                            }}
                            status="unreal"
                        />

                        <DMUser
                            user={{
                                username: 'Venture',
                                avatarUrl: '/images/logo.png',
                            }}
                            status="unreal"
                        />

                        <DMUser
                            user={{
                                username: 'Venture',
                                avatarUrl: '/images/logo.png',
                            }}
                            status="unreal"
                        />

                        <DMUser
                            user={{
                                username: 'Venture',
                                avatarUrl: '/images/logo.png',
                            }}
                            status="unreal"
                        />

                        <DMUser
                            user={{
                                username: 'Venture',
                                avatarUrl: '/images/logo.png',
                            }}
                            status="unreal"
                        />

                        <DMUser
                            user={{
                                username: 'Venture',
                                avatarUrl: '/images/logo.png',
                            }}
                            status="unreal"
                        />

                        <DMUser
                            user={{
                                username: 'Venture',
                                avatarUrl: '/images/logo.png',
                            }}
                            status="unreal"
                        />

                        <DMUser
                            user={{
                                username: 'Venture',
                                avatarUrl: '/images/logo.png',
                            }}
                            status="unreal"
                        />
                    </Sidebar>

                    <Page name="Home" icon="home" tabs={[<>Catch up on the things that happened recently.</>]}>
                        <>real</>
                    </Page>
                </div>
            </div>
        </React.Fragment>
    );
};

export default NextPage;
