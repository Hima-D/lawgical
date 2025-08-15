// app/api/services/categories/route.js
// GET /api/services/categories - Get available service categories
export async function GET() {
  try {
    const categories = await prisma.service.findMany({
      where: {
        category: { not: null },
        isActive: true
      },
      select: {
        category: true
      },
      distinct: ['category']
    });

    const categoryList = categories
      .map(c => c.category)
      .filter(Boolean)
      .sort();

    return Response.json({
      categories: categoryList,
      count: categoryList.length
    });

  } catch (error) {
    console.error('Get categories error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
