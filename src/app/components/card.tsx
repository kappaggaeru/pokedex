type CardProps = {
    title: string;
    description: string;
    image: string;
};

export default function Card({ title, description, image }: CardProps) {
    return (
        <div className="max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{description}</p>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    Ver más
                </button>
            </div>
        </div>
    );
}