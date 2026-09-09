import React from 'react';
import { Language } from '../types';
import { LeafletMap } from './LeafletMap';

interface CampusMapProps {
  lang: Language;
}

export const CampusMap: React.FC<CampusMapProps> = ({ lang }) => {
  return <LeafletMap lang={lang} />;
};
