export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      {
        name: 'image',
        title: 'Image',
        type: 'array',
        of: [{ type: 'image' }],
        options: {
          hotspot: true,
        }
      },
      { 
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      { 
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 90,
        }
      },
      { 
        name: 'price',
        title: 'Price',
        type: 'number',
      },
      { 
        name: 'details',
        title: 'Details',
        type: 'string',
      },
      {
        name: 'category',
        title: 'Product Category',
        type: 'reference',
        to: [{ type: 'category' }],
      },
      {
        name: 'company',
        title: 'Company',
        type: 'reference',
        to: [{ type: 'company' }],
      },
      {
        name: 'colors',
        title: 'Colors',
        type: 'array',
        of: [{type: 'string'}],
        options: {
          layout: 'tags'
        }
      },
      {
        name: 'styles',
        title: 'Styles',
        type: 'array',
        of: [{type: 'string'}],
        options: {
          layout: 'tags'
        }
      },
    ]
  }