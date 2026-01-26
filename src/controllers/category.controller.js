import { createCategoryService, deleteCategoryService, getMyCategoriesService, updateCategoryService } from "../services/category.service.js";

export const getMyCategories = async (req, res) => {
    const userId = req.user.id;
    try {
        const categories = await getMyCategoriesService(userId);
        return res.status(200).json({
            message: "Berhasil mengambil kategori",
            data: categories
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message || "Gagal mengambil kategori",
        });
    }

}

export const createCategory = async (req, res) => {
    const userId = req.user.id;
    const data = { ...req.body, userId };

    try {
        const category = await createCategoryService(data);
        return res.status(201).json({
            message: "Berhasil membuat kategori",
            data: category
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message || "Gagal membuat kategori",
        });
    }
}

export const updateCategory = async (req, res) => {
    const userId = req.user.id;
    const id = req.params.id;
    const data = { ...req.body, userId, id };

    try {
        const category = await updateCategoryService(data);
        return res.status(200).json({
            message: "Berhasil mengupdate kategori",
            data: category
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message || "Gagal mengupdate kategori",
        });
    }
}

export const deleteCategory = async (req, res) => {
    const userId = req.user.id;
    const id = req.params.id;

    try {
        const result = await deleteCategoryService({ userId, id });
        if (result)
            return res.status(200).json({
                message: "Berhasil menghapus kategori"
            })
    } catch (error) {
        return res.status(400).json({
            message: error.message || "Gagal menghapus kategori",
        });
    }
}