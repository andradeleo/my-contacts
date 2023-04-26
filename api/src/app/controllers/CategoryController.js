const CategoriesRepository = require("../repositories/CategoriesRepository");

class CategoryController {
	async index(request, response) {
		const categories = await CategoriesRepository.findAll();
		response.json(categories);
	}

	async store(request, response) {
		const { name } = request.body;

		if (!name) {
			response
				.status(400)
				.json({ error: "Name is required" });
		}

		const categorie = await CategoriesRepository.create({ name });
		response.status(201).json(categorie);
	}

	async update(request, response) {
		const { id } = request.params;
		const { name } = request.body;

		console.log(id, name);

		const CategoryExists = await CategoriesRepository.findById(id);
		console.log(CategoryExists);
		if (!CategoryExists) {
			return response.status(404).json({error: "Categorie not found"});
		}

		if (!name) {
			response
				.status(400)
				.json({ error: "Category name is required" });
		}

		const category = await CategoriesRepository.update(id, { name });
		response.json(category);
	}

	async delete(request, response) {
		const { id } = request.params;

		await CategoriesRepository.delete(id);
		// 204: No content
		response.sendStatus(204);
	}
}

module.exports = new CategoryController();