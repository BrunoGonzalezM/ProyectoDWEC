import React, { useEffect, useState } from 'react';
import {fetchCategorias} from "../funciones/fetch"
import { Link } from 'react-router-dom';
import "../styles/stylesCategorias.css"

export default function Categorias() {
    const [categorias, setCategorias] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriaData = await fetchCategorias();
                setCategorias(categoriaData);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div>
                {categorias.map((categoria) => (
                    <Link key={categoria.id} to={`/categoria/${categoria.id}`}>
                        <div className='categoriaDiv'  >
                            <div>
                                {categoria.name}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}