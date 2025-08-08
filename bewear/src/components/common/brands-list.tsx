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
    { id: 1, name: 'Nike', imageUrl: '/Vector.png' },
    { id: 2, name: 'Balance', imageUrl: '/Vector (1).png' },
    { id: 3, name: 'Puma', imageUrl: '/Vector (2).png' },
    { id: 4, name: 'Adidas', imageUrl: '/Vector (3).png' },
]

const BrandsList = ({ title }: BrandsListProps) => {
    return (
        <div className="space-y-6">
            <h3 className="font-semibold px-5">{title}</h3>
            <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
                {brands.map((brand) => (
                    <div key={brand.id} className="max-w-[100px] flex flex-col items-center gap-2">
                        <Image src={brand.imageUrl} alt={brand.name} width={0} height={0} sizes="100vw" className="h-auto w-full" />
                        <p>{brand.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BrandsList