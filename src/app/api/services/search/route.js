
// app/api/services/search/route.js
// GET /api/services/search - Search services across all lawyers
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const category = searchParams.get('category');
    const minPrice = parseFloat(searchParams.get('minPrice')) || 0;
    const maxPrice = parseFloat(searchParams.get('maxPrice')) || 999999;
    const maxDuration = parseInt(searchParams.get('maxDuration')) || 999999;
    const location = searchParams.get('location');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = Math.min(parseInt(searchParams.get('limit')) || 20, 50); // Max 50 results

    const whereClause = {
      isActive: true,
      price: {
        gte: minPrice,
        lte: maxPrice
      },
      durationMinutes: {
        lte: maxDuration
      }
    };

    if (query) {
      whereClause.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { category: { contains: query, mode: 'insensitive' } }
      ];
    }

    if (category && category !== 'all') {
      whereClause.category = category;
    }

    if (location) {
      whereClause.lawyerProfile = {
        OR: [
          { city: { contains: location, mode: 'insensitive' } },
          { state: { contains: location, mode: 'insensitive' } },
          { country: { contains: location, mode: 'insensitive' } }
        ]
      };
    }

    const skip = (page - 1) * limit;

    const [services, totalCount] = await Promise.all([
      prisma.service.findMany({
        where: whereClause,
        include: {
          lawyerProfile: {
            select: {
              id: true,
              specialization: true,
              experience: true,
              city: true,
              state: true,
              country: true,
              user: {
                select: {
                  displayName: true,
                  profileImage: true
                }
              }
            }
          }
        },
        orderBy: [
          { createdAt: 'desc' }
        ],
        skip,
        take: limit
      }),
      prisma.service.count({ where: whereClause })
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return Response.json({
      services,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNext: page < totalPages,
        hasPrev: page > 1,
        limit
      },
      filters: {
        query,
        category,
        priceRange: { min: minPrice, max: maxPrice },
        maxDuration,
        location
      }
    });

  } catch (error) {
    console.error('Search services error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
