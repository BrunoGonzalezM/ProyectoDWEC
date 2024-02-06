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
                    <div className='categoriaDiv' key={categoria.id} >
                        <Link to={`/pelicula/${categoria.name}`}>
                            <div>
                                {categoria.name}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}