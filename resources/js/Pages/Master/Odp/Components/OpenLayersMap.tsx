import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import 'ol/ol.css';
import { fromLonLat, toLonLat } from 'ol/proj';
import { XYZ } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import { Style } from 'ol/style';
import Icon from 'ol/style/Icon';
import React, { useEffect, useRef } from 'react';
import poinIcon from '../../../../../images/maps/poin.png';

type PaginationSearchFormProps = {
    gate: {
        create: boolean;
        update: boolean;
        delete: boolean;
    };
    dataMaps: [];
    perusahaan: any;
    setForm: React.Dispatch<React.SetStateAction<boolean>>;
    setData: (data: any) => void;
    setDataInfo: React.Dispatch<React.SetStateAction<any>>;
};

export default function OpenLayersMap({ gate, dataMaps, perusahaan, setForm, setData, setDataInfo }: PaginationSearchFormProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<Map | null>(null);
    const vectorLayerRef = useRef<VectorLayer | null>(null);
    const overlaysRef = useRef<Overlay[]>([]);

    useEffect(() => {
        if (!mapRef.current) return;

        if (!mapInstance.current) {
            // Inisialisasi peta pertama kali
            const googleMapsLayer = new TileLayer({
                source: new XYZ({
                    url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
                }),
            });

            const vectorSource = new VectorSource();
            const vectorLayer = new VectorLayer({
                source: vectorSource,
                style: new Style({
                    image: new Icon({
                        anchor: [0.5, 1],
                        src: poinIcon,
                        scale: 0.1,
                    }),
                }),
            });

            const map = new Map({
                target: mapRef.current,
                layers: [googleMapsLayer, vectorLayer],
                view: new View({
                    center: fromLonLat(perusahaan.koordinat),
                    zoom: 17,
                }),
            });

            mapInstance.current = map;
            vectorLayerRef.current = vectorLayer;

            map.on('click', (event) => {
                const feature = map.forEachFeatureAtPixel(event.pixel, (feat) => feat);
                if (feature) {
                    setDataInfo((prev: any) => ({
                        ...prev,
                        odp: feature.getId(),
                        nama: feature.get('nama'),
                        alamat: feature.get('alamat'),
                        currentPage: 1,
                    }));
                }
            });

            if (gate.create) {
                map.getViewport().addEventListener('contextmenu', (event) => {
                    event.preventDefault();
                    setData({
                        koordinat: toLonLat(map.getEventCoordinate(event)),
                        perusahaan: perusahaan.id,
                    });
                    setForm(true);
                });
            }
        }

        const map = mapInstance.current;
        if (!map) return;

        // Hapus semua overlay lama sebelum menambahkan yang baru
        overlaysRef.current.forEach((overlay) => map.removeOverlay(overlay));
        overlaysRef.current = [];

        const vectorLayer = vectorLayerRef.current;
        if (!vectorLayer) return;

        // Hapus semua fitur dari vector layer
        const vectorSource = vectorLayer.getSource();
        if (vectorSource) {
            vectorSource.clear();
        }

        // Tambahkan titik lokasi dan overlay baru
        dataMaps.forEach(({ id, nama, alamat, koordinat }) => {
            const parsedKoordinat = JSON.parse(koordinat);
            if (Array.isArray(parsedKoordinat)) {
                const feature = new Feature({
                    geometry: new Point(fromLonLat(parsedKoordinat)),
                });
                feature.setId(id);
                feature.set('nama', nama);
                feature.set('alamat', alamat);
                vectorSource?.addFeature(feature);

                // **Tambahkan Label (Overlay)**
                const labelElement = document.createElement('div');
                labelElement.className = 'text-xs';
                labelElement.innerHTML = nama;

                const overlay = new Overlay({
                    position: fromLonLat(parsedKoordinat),
                    element: labelElement,
                    offset: [+10, -24],
                });

                map.addOverlay(overlay);
                overlaysRef.current.push(overlay); // Simpan overlay untuk dihapus nanti
            }
        });

    }, [dataMaps]);

    return <div ref={mapRef} style={{ width: '100%', height: '65vh' }} />;
}
