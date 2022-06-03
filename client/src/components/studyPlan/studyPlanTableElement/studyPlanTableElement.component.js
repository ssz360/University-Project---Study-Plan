import ReactTooltip from 'react-tooltip';

function StudyPlanTableElement() {
    return (
        <tr className="text-left">
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">02GOLOV</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    Architetture dei sistemi di elaborazione
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    12
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span
                    className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span aria-hidden
                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                    <span className="relative">12</span>
                </span>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    43
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <span
                    className="relative inline-block px-3 py-1 font-semibold text-gray-900 leading-tight cursor-pointer">
                    <span aria-hidden
                        className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                    <span className="relative">Compatibility</span>
                </span>
                <span
                    className="relative inline-block px-3 py-1 font-semibold text-gray-900 leading-tight cursor-pointer">
                    <span aria-hidden
                        className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"></span>
                    <span className="relative">Preparatory</span>
                </span>
            </td>
        </tr>
    );
}

export default StudyPlanTableElement;
