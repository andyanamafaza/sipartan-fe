import React from "react"

export const MapLegend = () => {
    return (
        <div className='bg-light ms-2 mb-2 px-3 rounded p-2 border border-1 border-dark custom-shadow' style={{ position: 'absolute', bottom: '0rem', left: '0rem', zIndex: '401' }}>
            <table className="legend-table">
                <tbody>
                    <tr>
                        <th colSpan={2}>Keterangan Tingkat Keparahan</th>
                    </tr>
                    <tr>
                        <td><img className='legend-img' src="/img/marker-darkred.png" alt="marker-darkred" /></td>
                        <td>Sangat Berat ( 80 - 100 )</td>
                    </tr>
                    <tr>
                        <td><img className='legend-img' src="/img/marker-lightred.png" alt="marker-lightred" /></td>
                        <td>Berat ( 60 - 80 )</td>
                    </tr>
                    <tr>
                        <td><img className='legend-img' src="/img/marker-yellow.png" alt="marker-yellow" /></td>
                        <td>Sedang ( 40 - 60 )</td>
                    </tr>
                    <tr>
                        <td><img className='legend-img' src="/img/marker-lightgreen.png" alt="marker-lightgreen" /></td>
                        <td>Ringan ( 20 - 40 )</td>
                    </tr>
                    <tr>
                        <td><img className='legend-img' src="/img/marker-darkgreen.png" alt="marker-darkgreen" /></td>
                        <td>Sangat Ringan ( 0 - 20 )</td>
                    </tr>
                </tbody>

            </table>
        </div>
    )
}
