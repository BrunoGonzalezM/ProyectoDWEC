import React, { useEffect, useState } from 'react';
import fetchCategorias from "../funciones/fetchCategorias"
import { Link } from 'react-router-dom';

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
                    <Link key={categoria.id} to={`/pelicula/${categoria.name}`}>
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