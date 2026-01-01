import { prisma } from "../libs/prisma.js";

export const getMyCategoriesService = async (id) => {
    const categories = await prisma.category.findMany({
        where: { userId: id }
    });

    return categories;
}

export const createCategoryService = async (data) => {
    const { userId, name, type } = data;

    const category = await prisma.category.create({
        data: {
            userId, name, type
        }
    });

    return category;
}

export const updateCategoryService = async (data) => {
    console.log(data)
    const { userId, id, name, type } = data;

    const category = await prisma.category.findFirst({
        where: { id, userId }
    })

    if (!category) throw new Error("Kategori tidak ditemukan");

    let updatedData = {}

    if (name !== undefined) updatedData.name = name;
    if (type !== undefined) updatedData.type = type;

    const result = await prisma.category.update({
        where: { id },
        data: updatedData
    });

    return result;
}

export const deleteCategoryService = async (data) => {
    const { userId, id } = data;

    const category = await prisma.category.findFirst({
        where: { id, userId }
    })

    if (!category) throw new Error("Kategori tidak ditemukan");

    const transactions = await prisma.transaction.count({
        where: { categoryId: id }
    })

    if (transactions > 0)
        throw new Error("Tidak dapat menghapus kategori karena memiliki transaksi yang terkait")

    await prisma.category.delete({ where: { id } })

    return true;
}