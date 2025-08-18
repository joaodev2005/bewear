import Image from "next/image"

interface Brand {
    id: number
    name: string
    imageUrl: string
}

interface BrandsListProps {
    title: string
}

const brands: Brand[] = [
    { id: 1, name: "Nike", imageUrl: "/Vector.png" },
    { id: 2, name: "Adidas", imageUrl: "/Vector (3).png" },
    { id: 3, name: "Puma", imageUrl: "/Vector (2).png" },
    { id: 4, name: "Balance", imageUrl: "/Vector (1).png" },
]

const BrandsList = ({ title }: BrandsListProps) => {
    return (
        <div className="space-y-6">
            <h3 className="font-semibold px-5">{title}</h3>

            <div className="flex w-full justify-between gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
                {brands.map((brand) => (
                    <div
                        key={brand.id}
                        className="group flex cursor-pointer flex-col items-center space-y-2"
                    >
                        {/* Caixa branca com hover gradiente */}
                        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white shadow-sm transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 md:h-[135px] md:w-[173px]">
                            <Image
                                src={brand.imageUrl}
                                alt={brand.name}
                                width={55}
                                height={55}
                                className="h-8 w-8 group-hover:brightness-0 group-hover:invert md:h-[55px] md:w-[55px]"
                            />
                        </div>

                        {/* Nome com gradiente no hover */}
                        <span className="cursor-pointer bg-clip-text text-center text-[12px] font-medium transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 group-hover:text-transparent md:text-lg">
                            {brand.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BrandsList