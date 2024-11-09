import mongoose from 'mongoose';

const recyclableProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Veuillez ajouter un nom'],
      unique: true,
      trim: true,
      maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères'],
    },
    brand: {
      type: String,
      required: [true, 'Veuillez ajouter une marque'],
      unique: true,
      trim: true,
      maxlength: [50, 'La marque ne peut pas dépasser 50 caractères'],
    },
    plastic_types: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Plastic_type',
        required: true,
      },
    ],
    colors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlasticColor', // Référence au modèle des couleurs de plastique
        required: true,
      },
    ],
    weightGr: {
      type: Number,
      required: true,
    },
    barCode: {
      type: String,
      required: [true, 'Veuillez ajouter un code-barres'],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Veuillez ajouter une description'],
      maxlength: [1000, 'La description ne peut pas dépasser 1000 caractères'],
    },
    recyclingNote: {
      type: Number,
      min: [1, 'La note doit être d\'au moins 1'],
      max: [10, 'La note ne peut pas dépasser 10'],
    },
    photo: {
      type: String,
      default: 'no-photo.jpg',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const RecyclableProduct = mongoose.model(
  'RecyclableProduct',
  recyclableProductSchema,
);

export default RecyclableProduct;
