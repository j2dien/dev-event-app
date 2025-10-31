import { Schema, model, models, Document } from 'mongoose';

// Strongly-typed Event document
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string; // normalized to YYYY-MM-DD
  time: string; // normalized to HH:MM (24h)
  mode: 'online' | 'offline' | 'hybrid';
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      validate: { validator: (v: string) => v.trim().length > 0, message: 'Title cannot be empty' },
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      validate: { validator: (v: string) => v.trim().length > 0, message: 'Description cannot be empty' },
    },
    overview: {
      type: String,
      required: [true, 'Overview is required'],
      trim: true,
      validate: { validator: (v: string) => v.trim().length > 0, message: 'Overview cannot be empty' },
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
      trim: true,
      validate: { validator: (v: string) => v.trim().length > 0, message: 'Image cannot be empty' },
    },
    venue: {
      type: String,
      required: [true, 'Venue is required'],
      trim: true,
      validate: { validator: (v: string) => v.trim().length > 0, message: 'Venue cannot be empty' },
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      validate: { validator: (v: string) => v.trim().length > 0, message: 'Location cannot be empty' },
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
      validate: { validator: (v: string) => v.trim().length > 0, message: 'Date cannot be empty' },
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
      validate: { validator: (v: string) => v.trim().length > 0, message: 'Time cannot be empty' },
    },
    mode: {
      type: String,
      required: [true, 'Mode is required'],
      enum: { values: ['online', 'offline', 'hybrid'], message: 'Mode must be online, offline, or hybrid' },
    },
    audience: {
      type: String,
      required: [true, 'Audience is required'],
      trim: true,
      validate: { validator: (v: string) => v.trim().length > 0, message: 'Audience cannot be empty' },
    },
    agenda: {
      type: [String],
      required: [true, 'Agenda is required'],
      validate: {
        validator: (arr: string[]) => Array.isArray(arr) && arr.length > 0 && arr.every((s) => typeof s === 'string' && s.trim().length > 0),
        message: 'Agenda must contain at least one non-empty item',
      },
    },
    organizer: {
      type: String,
      required: [true, 'Organizer is required'],
      trim: true,
      validate: { validator: (v: string) => v.trim().length > 0, message: 'Organizer cannot be empty' },
    },
    tags: {
      type: [String],
      required: [true, 'Tags are required'],
      validate: {
        validator: (arr: string[]) => Array.isArray(arr) && arr.length > 0 && arr.every((s) => typeof s === 'string' && s.trim().length > 0),
        message: 'Tags must contain at least one non-empty item',
      },
    },
  },
  { timestamps: true }
);

/**
 * Pre-save: generate slug (only if title changed), and normalize date/time formats.
 */
eventSchema.pre('save', function (this: IEvent, next) {
  // Slugify title when changed
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  // Normalize date to YYYY-MM-DD
  if (this.isModified('date')) {
    try {
      const parsed = new Date(this.date);
      if (Number.isNaN(parsed.getTime())) return next(new Error('Invalid date format'));
      this.date = parsed.toISOString().split('T')[0];
    } catch {
      return next(new Error('Invalid date format'));
    }
  }

  // Normalize time to HH:MM (24h, zero-padded)
  if (this.isModified('time')) {
    const match = this.time.match(/^(\d{1,2}):([0-5]\d)$/);
    if (!match) return next(new Error('Time must be in HH:MM format'));
    const hour = Number(match[1]);
    if (hour < 0 || hour > 23) return next(new Error('Time hour must be between 00 and 23'));
    this.time = `${hour.toString().padStart(2, '0')}:${match[2]}`;
  }

  next();
});

// Unique index on slug to enforce unique URLs
eventSchema.index({ slug: 1 }, { unique: true });

// Prevent recompilation in dev
const Event = models.Event || model<IEvent>('Event', eventSchema);
export default Event;
