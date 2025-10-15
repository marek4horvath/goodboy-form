'use client';

import React, { useEffect, useState } from 'react';
import styles from "./ProjectSection.module.scss";
import { fetchShelterResults } from "@/api/sheltersApi";
import { Spin } from 'antd';
import { useTranslation } from 'react-i18next';


interface ShelterResults {
  contributors: number;
  contribution: number;
}
export default function ProjectSection() {
    const [stats, setStats] = useState<ShelterResults | null>(null);
    const { t } = useTranslation('common');

    useEffect(() => {
        const loadData = async () => {
        try {
            const data = await fetchShelterResults();
            setStats(data);
        } catch (err) {
            console.error('Error loading statistics:', err);
        }
        };

        loadData();
    }, []);

    return (
       <section className={styles.section}>
            <div className={styles.cards}>
                {stats ? (
                    <>
                        <div className={styles.card}>
                        <h2>{stats.contribution.toLocaleString('sk-SK')} €</h2>
                        <p>{ t('aboutProject.totalValue') }</p>
                        </div>
                        <div className={styles.card}>
                        <h2>{stats.contributors.toLocaleString('sk-SK')}</h2>
                        <p>{ t('aboutProject.numberDonors') }</p>
                        </div>
                    </>
                    ) : (
                    <div >
                        <Spin />
                    </div>
                )}
            </div>
        </section>
    )
}
