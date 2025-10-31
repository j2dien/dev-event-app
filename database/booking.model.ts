import { Schema, model, models, Document, Types } from 'mongoose';

// Strongly-typed Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
      index: true, // speeds up queries by event
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address'],
    },
  },
  { timestamps: true }
);

/**
 * Pre-save: ensure the referenced Event exists before creating a Booking.
 */
bookingSchema.pre('save', async function (this: IBooking, next) {
  if (this.isModified('eventId')) {
    try {
      // Lazy import avoids circular deps during model compilation
      const Event = models.Event || (await import('./event.model')).default;
      const exists = await Event.findById(this.eventId);
      if (!exists) return next(new Error('Referenced event does not exist'));
    } catch (err) {
      if (err instanceof Error && err.message === 'Referenced event does not exist') return next(err);
      return next(new Error('Error validating event reference'));
    }
  }
  next();
});

// Redundant, but explicit index in addition to field-level index
bookingSchema.index({ eventId: 1 });

// Prevent recompilation in dev
const Booking = models.Booking || model<IBooking>('Booking', bookingSchema);
export default Booking;
