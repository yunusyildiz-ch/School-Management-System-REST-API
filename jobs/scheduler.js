import cron from 'node-cron';
import { format, subDays } from 'date-fns';
import Assignment from '../models/assignment';
import assignmentService from '../services/assignmentService';