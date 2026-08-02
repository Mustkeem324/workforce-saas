import { Request, Response, NextFunction } from 'express';

interface RouteMetric {
  count: number;
  errors: number;
  totalDurationMs: number;
}

const metricsStore: Record<string, RouteMetric> = {};

export function metricsMiddleware(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now();
  const route = req.path;

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    if (!metricsStore[route]) {
      metricsStore[route] = { count: 0, errors: 0, totalDurationMs: 0 };
    }

    metricsStore[route].count += 1;
    metricsStore[route].totalDurationMs += duration;
    if (res.statusCode >= 400) {
      metricsStore[route].errors += 1;
    }
  });

  next();
}

export function generatePrometheusMetrics(): string {
  let output = `# HELP http_requests_total Total number of HTTP requests\n# TYPE http_requests_total counter\n`;

  for (const [route, data] of Object.entries(metricsStore)) {
    output += `http_requests_total{route="${route}"} ${data.count}\n`;
    output += `http_requests_errors_total{route="${route}"} ${data.errors}\n`;
    const avgLatency = data.count > 0 ? (data.totalDurationMs / data.count).toFixed(2) : '0';
    output += `http_request_duration_ms_avg{route="${route}"} ${avgLatency}\n`;
  }

  return output;
}
